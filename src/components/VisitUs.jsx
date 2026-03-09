import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

export default function VisitUs() {
  return (
    <div
      id="visitus"
      className="bg-sage mx-6 mb-16 p-10 rounded-3xl shadow-lg text-center"
    >
      <h3 className="text-3xl font-serif text-pinky font-bold">
        Visit Us Today <br /> or Order Now 🛵
      </h3>

      <p className="mt-4 text-lg text-pinky">
        Shop No 10, Poonam Tower, Dharshana Society, Sector 20, Nerul,
        Navi Mumbai, Maharashtra 400706
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <a
          href="https://www.google.com/maps/place/CREAMANTRA/@19.0368515,73.0101643,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3000a9a8103:0x28c34784fc1f56b4!8m2!3d19.0368515!4d73.0127392!16s%2Fg%2F11yjvb5djb?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sage text-white px-6 py-3 rounded-full
                     hover:bg-pinky hover:text-sage transition"
        >
          Visit Store
        </a>

        <a
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sage text-white px-6 py-3 rounded-full
                     hover:bg-pinky hover:text-sage transition"
        >
          Order Now
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-8 text-2xl text-pinky">
        <a
          href="https://www.instagram.com/creamantra_?igsh=MXYydmtmeXFtc210ZA=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="cursor-pointer hover:scale-110 transition" />
        </a>

        <a
          href="https://www.facebook.com/share/1D4FANe642/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="cursor-pointer hover:scale-110 transition" />
        </a>

        

        <a
          href="https://youtube.com/@icecreamantra?si=EyU_UJ2wAYNseZNC"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="cursor-pointer hover:scale-110 transition" />
        </a>
      </div>
    </div>
  );
}
