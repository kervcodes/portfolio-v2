import { Button } from "@/components/Button";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { 
    ArrowRight, 
    Download,  
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export const Hero = () => {
  
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <img 
                        src="/bg-hero.jpg"
                        alt="Background image for the hero"
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 -z-10"
                />
                <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background" />   
            </div>
         
            {/* Content */}
            <div className="container mx-auto px-6 pt-40 pb-20 relative z-10">
                <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-8">
                    {/* HeadLine */}
                    <div className="space-y-4">
                        <h1 className="color-highlight text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in animation-delay-100">
                            Software Engineer
                        </h1>
                        <h3 className="color-highlight text-2xl md:text-3xl lg:text-4xl pb-10 font-bold leading-tight animate-fade-in animation-delay-300">Boston, Ma</h3>
                        <p className="text-lg/8 text-mute-foreground max-w-2xl mx-auto animate-fade-in animation-delay-800">
                            Hi, I'm Kervintz, a full-stack engineer who turns product ideas into reliable SaaS applications —
                            from polished user interfaces to backend systems, APIs, and cloud infrastructure.
                        </p>
                    </div>
                    {/* CTA */}
                    <div className="flex items-center justify-center gap-4 animated-fade-in animation-delay-300">
                        <Button className="lg">
                            Contact Me <ArrowRight className="w-5 h-6" />
                        </Button>
                        <AnimatedBorderButton>
                            <Download className="w-5 h-5" />
                            Download CV
                        </AnimatedBorderButton>
                    </div>
                    {/* Social  */}
                    <div className="flex items-center justify-center gap-4 animated-fade-in animation-delay-400">
                         {/* <span className="text-sm text-muted-foreground">Social:</span> */}
                    {[
                        { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/kervintznoel/" },
                        { icon: FaGithub, href: "https://github.com/kervcodes" }
                    ].map((social, index) => (
                        <a 
                            href={social.href}
                            target="_blank"  
                            key={index} 
                            className="glass justify-content p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
                        >
                            {<social.icon className=""/>}
                        </a>
                    ))}
                    </div>
                </div>
            </div>
        </section>
     )
}