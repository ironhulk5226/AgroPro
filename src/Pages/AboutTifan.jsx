import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";

function AboutTifan() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Heading */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#111811] tracking-light text-[32px] font-bold leading-tight min-w-72">
              TIFAN: Revolutionizing Agriculture
            </p>
          </div>

          {/* Main Image */}
          <div className="flex w-full grow bg-white py-3">
            <div className="w-full gap-1 overflow-hidden bg-white aspect-[3/2] flex">
              <div
                className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDyN8Oc62C74mFgCv9viEKqETwlPtIPsAz6LwhEavNny9_E9hF7ouprad59Ynhdy3zIgUWGmhpcSq0n3ek0tg28UUVGmGvgUG5nZU9gMffJGfeqbfBCAQOa3BeQ9bG6r18S6ZxVOXF4pelNlH6Vxn8oKDiz8BAeQWTNXEs1gglbLCcSGR38xKbzJRPeICM9V0r3lVs9Hpb_K7TUoVBvUAQ8xraZlz1TKy3o328oXO8D8R2gSyovzhocJLEDu_Dbq-zRLZq-Tzlk4NQ5")',
                }}
              ></div>
            </div>
          </div>

          {/* Sections */}
          <h2 className="text-[#111811] text-[22px] font-bold px-4 pb-3 pt-5">
            What is TIFAN?
          </h2>
          <p className="text-[#111811] text-base px-4 pb-3 pt-1">
            TIFAN is an innovative smart farming solution developed by the
            college&apos;s innovation club. It integrates advanced sensors,
            robotics, and AI to optimize crop yields, reduce resource
            consumption, and promote sustainable agricultural practices.
          </p>

          <h2 className="text-[#111811] text-[22px] font-bold px-4 pb-3 pt-5">
            The Development Story
          </h2>
          <p className="text-[#111811] text-base px-4 pb-3 pt-1">
            The journey of TIFAN began with a vision to address the challenges
            faced by modern agriculture. Our team of passionate students and
            mentors collaborated to design and build a system that combines
            cutting-edge technology with practical farming needs.
          </p>

          <h2 className="text-[#111811] text-[22px] font-bold px-4 pb-3 pt-5">
            Our Goals
          </h2>
          <ul className="text-[#111811] text-base px-8 pb-3 pt-1 list-disc">
            <li>Enhance crop productivity and quality</li>
            <li>Minimize water and fertilizer usage</li>
            <li>Reduce labor costs through automation</li>
            <li>Provide real-time data and insights</li>
            <li>Foster a community of innovative farmers</li>
          </ul>

          <h2 className="text-[#111811] text-[22px] font-bold px-4 pb-3 pt-5">
            Explore TIFAN
          </h2>

          {/* Scrollable Cards */}
          <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 gap-3">
              {/* Card 1 */}
              <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA6MXCSA7MO5QPvjd1ApQ_ioNYfy7sP4oBxFpS7ObtC0oxFbnCL3JNV-WMyquDs2gG5JKinMp5iV0y6zrHnIj6HjF8XmB_58WQj_PIwHASU8VHSGpQ20X18jq0z65YCLLIxgIWkFbHQIua_aAnSHfHwLKmn0r28lWZfpjpYX_uM62d8r5LKAY49gfzoIgtraq8z7dTs-BkX-uMOIvBuwRZpDescNo-4zM81t_OGMprmHuv_gFK5mNx-VUuHXMRjwtNUpTYOQdxWgL7g")',
                  }}
                ></div>
                <p className="text-[#111811] text-base font-medium">
                  TIFAN in Action
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBzPNk2UKvIRgWYEKtjLrkBdRSqlcgmKL8Km_WEnHQnJ-0gGaZwR9DdFhKJImh9bGe3tR7f0XmC-BRwKGxFkCcyFQySHviGEkIMFa1fwg3E8RElofifIjf1j1zxMrzBoqeT3hDIQCbmUesShJgIU5KFl7eMKPAz-go7fkm9nzkql37rCXaQJuFU7fpQzQ0-WTWJdsXys4WqfMUygADV7XGOcxHSbygKQw7fnlYOuMJVFXqJRd1AiIkpwyGuZpHDArwPL5GhqZU4ibD5")',
                  }}
                ></div>
                <p className="text-[#111811] text-base font-medium">
                  TIFAN Components
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIOucptQsc7poXWrC_AfGvxlBWWyN4EJrLCP1hh1oPqGc5Ulsd2nyICvsT9uhBGOMRxKVMcIkwkX5wzRKNSrhnvoyMCh6hMJbiWDpr5H5EJgNExPjsTqXoIHM3T1LVmmH6iKiZCm6DZwu0DGsejoRQTskueOT-MEiw-ZCmAH1VdOErhznasZM8xELAkqYT1D8z_F04Jek12w5kH4SQ25B1RYbG5vhgOIkeX7CP0_Wy6FN2U8vbQFqs7ATrEWRAzpxugyfBG430ZRic")',
                  }}
                ></div>
                <p className="text-[#111811] text-base font-medium">
                  TIFAN Data Insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutTifan;
