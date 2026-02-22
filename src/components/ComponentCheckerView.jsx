import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { IconSun, IconMoon, IconSettings } from "@tabler/icons-react"
import { useTheme } from "@/hooks/useTheme"

const ComponentCheckerView = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="p-10 space-y-8 max-w-4xl mx-auto">

        {/* Header with Theme Toggle */}
        <header className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold font-outfit">Shadcn Component Check</h1>
            <p className="text-muted-foreground">Verifying Zinc + Green Theme (Tailwind v4)</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
          </Button>
        </header>

        {/* Theme Status Card */}
        <section>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Theme Controller Active</CardTitle>
              <CardDescription>
                Current mode: <span className="font-bold">{isDark ? "Dark" : "Light"}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This component is using <strong>OKLCH</strong> colors defined in your <code>App.css</code>.
                When you toggle the switch, we add the <code>.dark</code> class to the document root.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Base Elements */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Base Elements</h2>
          <div className="flex items-center gap-4">
            <Button>Primary Green Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Badge variant="outline" className="gap-1">
              <IconSettings size={14} /> Tabler Icons
            </Badge>
          </div>
        </section>

        {/* Accordion */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Interactive Elements</h2>
          <Accordion type="single" collapsible className="w-full border rounded-lg px-4 bg-card">
            <AccordionItem value="item-1">
              <AccordionTrigger>Check Animations</AccordionTrigger>
              <AccordionContent>
                Your <code>@import "tw-animate-css";</code> is handling the smooth transitions here.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

      </div>
    </div>
  )
}

export default ComponentCheckerView