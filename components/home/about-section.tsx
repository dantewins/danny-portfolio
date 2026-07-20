import { AboutCollage } from "@/components/collage/about-collage";

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="items-center">
        <div className="space-y-4">
          <h6 className="font-raleway text-2xl leading-relaxed text-zinc-700 sm:text-3xl">
            A <b className="font-medium"> picture</b> is worth a{" "}
            <i className="font-merriweather">thousand</i> words.
          </h6>
        </div>
        <div className="mt-2 md:mt-4 lg:mt-6">
          <AboutCollage />
        </div>
      </div>
    </section>
  );
}
