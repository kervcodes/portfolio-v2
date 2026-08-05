// The travelling-glow border belonged to the previous world. In a checklist
// world a secondary action is an unlit key, so this now resolves to the
// outline variant of Button and exists only to keep older call sites valid.
import { Button } from "@/components/Button";

export const AnimatedBorderButton = ({ children, ...props }) => (
  <Button variant="outline" {...props}>
    {children}
  </Button>
);

export default AnimatedBorderButton;
