import { cinzel } from "../lib/utils";

export function AboutSection() {
  return (
    <section className="mx-auto mb-24 flex max-w-screen-lg flex-col justify-center">
      <div
        id="about"
        className="mb-2 text-left text-4xl font-bold uppercase"
        style={cinzel.style}
      >
        About
      </div>
      <div className="max-w-screen-md text-lg">
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          veritatis libero, voluptatum consectetur distinctio placeat aperiam
          quaerat corporis quas itaque a, corrupti explicabo eligendi quisquam
          doloremque suscipit nulla maiores eaque? Expedita nam omnis inventore
          architecto accusantium. Nemo aliquid ab unde sequi possimus esse
          temporibus officiis non ipsam ea eius molestiae porro molestias, enim
          laboriosam voluptatibus
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          consequatur rerum sint, illo expedita architecto deserunt earum
          sapiente, facilis, perspiciatis accusantium iste quaerat totam.
          Repudiandae, aspernatur natus. Minima, et commodi! Soluta veritatis
          distinctio ab, veniam animi velit perferendis omnis molestias quod
          vero inventore suscipit in perspiciatis optio a! Officiis, accusantium
          perferendis? Cupiditate, dignissimos veniam distinctio repellendus
          perferendis mollitia eligendi consequuntur.
        </p>
      </div>
    </section>
  );
}
