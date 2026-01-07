import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-forest group-[.toaster]:shadow-hard group-[.toaster]:rounded-xl group-[.toaster]:font-bold",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:font-medium",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:border-2 group-[.toast]:border-forest group-[.toast]:shadow-sm",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:border-2 group-[.toast]:border-forest/10",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
