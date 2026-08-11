import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/Button";
import { Check } from "@/components/Checklist";
import { Run, Step } from "@/lib/sequence";
import { trackEvent } from "@/lib/analytics";

// Contact runs on the charcoal panel: the OWN-WORLD promises placard charcoal
// owning full-width bands, and the page's closing conversion is the right one
// to own. Fields are restyled for that ground rather than inverted blindly.
const FIELD =
  "w-full bg-panel-2 border border-panel-2 px-3 py-2.5 text-panel-ink " +
  "placeholder:text-panel-muted focus:border-caution outline-none transition-colors";

const LABEL = "placard block text-panel-muted mb-1.5";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });
  const [noticeLeaving, setNoticeLeaving] = useState(false);
  const dismissTimers = useRef([]);

  useEffect(() => {
    return () => dismissTimers.current.forEach(clearTimeout);
  }, []);

  // The notice is a passing acknowledgement, not a permanent fixture — it
  // fades out on its own so the form is ready to use again.
  useEffect(() => {
    dismissTimers.current.forEach(clearTimeout);
    dismissTimers.current = [];
    if (!submitStatus.type) return;

    setNoticeLeaving(false);
    dismissTimers.current.push(
      setTimeout(() => setNoticeLeaving(true), 4500),
      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 4900)
    );
  }, [submitStatus.type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        // Visitor-facing copy never mentions env vars; the detail goes to the console.
        console.error("EmailJS configuration is missing — check VITE_EMAILJS_* env vars.");
        setSubmitStatus({
          type: "error",
          message:
            "The contact form isn't working right now. Please use the email link in the Direct panel and I'll get back to you.",
        });
        setIsLoading(false);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        publicKey
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent — I read every one and reply personally.",
      });
      trackEvent("contact_form_submit");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      // err.text is an EmailJS internal string — logged, never shown.
      console.error("EmailJS error:", err);
      setSubmitStatus({
        type: "error",
        message:
          "Your message didn't send. Check your connection and try again — or use the email link in the Direct panel.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="on-panel bg-panel text-panel-ink py-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <header className="rule-head rule-head--panel">
          <div className="flex items-baseline gap-3">
            <span className="placard text-panel-muted nums" aria-hidden="true">
              05
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
              Contact
            </h2>
          </div>
          <p className="mt-3 text-panel-muted leading-relaxed">
            If you're hiring, tell me about the role and the team — I'd rather
            hear about the problems than the perks. If you're building something
            and want to compare notes, that works too.
          </p>
        </header>

        <div className="mt-10 grid lg:grid-cols-12 gap-8">
          <form
            className="lg:col-span-7 border border-panel-2 p-5 md:p-7"
            onSubmit={handleSubmit}
            noValidate={false}
          >
            <p className="placard text-panel-muted">All three fields required</p>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="name" className={LABEL}>
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Steve Jobs"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={FIELD}
                />
              </div>

              <div>
                <label htmlFor="email" className={LABEL}>
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-describedby="email-help"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={FIELD}
                />
                <p id="email-help" className="mt-1.5 text-sm text-panel-muted">
                  This is where I'll reply.
                </p>
              </div>

              <div>
                <label htmlFor="message" className={LABEL}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  aria-describedby="message-help"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="We're hiring a backend engineer for our payments team…"
                  className={`${FIELD} resize-none`}
                />
                <p id="message-help" className="mt-1.5 text-sm text-panel-muted">
                  A few lines is plenty — the role, the team, or whatever you want to ask.
                </p>
              </div>
            </div>

            {/* The key reports that it committed: an indeterminate bar runs
                under it while the message is in flight, so the wait has a
                visible cause and not just a changed word. */}
            <div className="mt-6 border-t border-panel-2 pt-5">
              <Button
                className={`w-full ${isLoading ? "key-working" : ""}`}
                type="submit"
                variant="panel"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Sending…" : "Send message"}
              </Button>
            </div>

            {/* Status is announced to screen readers, not just shown. */}
            <div aria-live="polite" aria-atomic="true">
              {submitStatus.type && (
                <div
                  role={submitStatus.type === "error" ? "alert" : "status"}
                  // An answer the visitor is waiting on, not an arrival: it
                  // settles in a quarter of the entrance duration.
                  style={{ "--settle-dur": "240ms" }}
                  className={`notice mt-5 ${
                    noticeLeaving ? "notice--leaving" : "animate-settle"
                  } ${
                    submitStatus.type === "success"
                      ? "notice--verified"
                      : "notice--warning"
                  }`}
                >
                  <p className="notice__band">
                    {submitStatus.type === "success" ? "Sent" : "Not sent"}
                  </p>
                  <p className="px-4 py-3 text-sm text-ink-muted leading-relaxed">
                    {submitStatus.message}
                  </p>
                </div>
              )}
            </div>
          </form>

          {/* Direct route, for anyone who would rather not use a form. */}
          <aside className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-panel-2">
            <p className="placard text-panel-muted">Direct</p>
            <Run as="ul" className="mt-4 space-y-4 text-sm">
              <Step as="li">
                <p className="placard text-panel-muted">Email</p>
                <a
                  href="mailto:kervcodes@gmail.com"
                  className="text-panel-ink font-bold underline underline-offset-4 decoration-panel-muted hover:decoration-caution break-all"
                >
                  kervcodes@gmail.com
                </a>
              </Step>
              <Step as="li">
                <p className="placard text-panel-muted">Based</p>
                <p className="text-panel-ink font-bold">Boston, Massachusetts</p>
              </Step>
              <Step as="li">
                <p className="placard text-panel-muted">Availability</p>
                <p className="inline-flex items-center gap-2 text-verified-panel font-bold">
                  <Check className="text-verified-panel" />
                  Open to full-time roles
                </p>
              </Step>
            </Run>
          </aside>
        </div>
      </div>
    </section>
  );
};
