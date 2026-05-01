import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COURSES, enrollSchema, type EnrollValues } from "@/lib/schemas";

const Enroll = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EnrollValues>({ resolver: zodResolver(enrollSchema) });

  // const onSubmit = async (data: EnrollValues) => {
  //   await new Promise((r) => setTimeout(r, 700));
  //   toast.success(`Welcome aboard, ${data.name.split(" ")[0]}! We've received your enrollment for ${data.course}.`);
  //   reset();
  //   setTimeout(() => navigate("/"), 1200);
  // };
  const onSubmit = async (data) => {
    try {
      const formURL =
        "https://docs.google.com/forms/d/e/1FAIpQLScsJ6p5PSaIM1u-XRvqMUPHH935UhqJMAYM2xFiZc2yDNqqvw/formResponse";

      const params = new URLSearchParams();

      params.append("entry.1931440134", data.name);
      params.append("entry.890822922", data.email);
      params.append("entry.986118443", data.phone);
      params.append("entry.1868126992", data.course);

      await fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      console.log("Submitted:", data); // debug

      toast.success("Enrollment Submitted Successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Submission failed");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="relative gradient-hero pt-32 pb-16 md:pb-24 text-primary-foreground overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-secondary/30 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-accent/20 blur-3xl animate-float" />
        <div className="container relative z-10">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full text-sm mb-4">
              <GraduationCap className="w-4 h-4 text-accent" /> Start Your
              Journey
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Enroll in <span className="gradient-text">Skyspeak Academy</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Fill out the form below and our admissions team will contact you
              within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="flex-1 -mt-12 pb-20">
        <div className="container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass rounded-3xl p-6 md:p-10 max-w-2xl mx-auto shadow-[var(--shadow-elegant)] space-y-5 animate-scale-in"
          >
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your full name"
                className="mt-1.5 bg-white/70 h-11"
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="you@email.com"
                  className="mt-1.5 bg-white/70 h-11"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="10-digit mobile"
                  className="mt-1.5 bg-white/70 h-11"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="course">Course *</Label>
              <Select
                value={watch("course")}
                onValueChange={(v) =>
                  setValue("course", v, { shouldValidate: true })
                }
              >
                <SelectTrigger id="course" className="mt-1.5 bg-white/70 h-11">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {COURSES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.course && (
                <p className="text-xs text-destructive mt-1">
                  {errors.course.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-shine w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-[var(--shadow-gold)] h-12 text-base"
            >
              {isSubmitting ? "Submitting..." : "Submit Enrollment"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to be contacted by our admissions team.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Enroll;
