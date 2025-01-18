"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import "./Home.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "../../../assets/react-logo.png";

const Home = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [pseudoSvgHeight, setPseudoSvgHeight] = useState(0);

  const destinations = useMemo(
    () => ["WORLD", "MARS", "JOURNEY", "ROAD", "TECH STACK"],
    []
  );

  const RoadmapItem = ({
    date,
    title,
    description,
    classes,
    newClass,
    index,
  }) => (
    <li
      className={`border-l-[1px] text-[1.2rem] z-50 mb-[2rem] pl-6 h-[10rem] ${
        visibleItems[visibleItems.length - 1] === index ? classes : newClass
      }`}
    >
      <div className="mb-[1rem]">
        <VerifiedIcon className="translate-x-[-37px] translate-y-[1.5rem]" />
        <h3>{date}</h3>
      </div>
      <div
        className={`${
          visibleItems[visibleItems.length - 1] === index
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        <h3>{title}:</h3>
        <h3 className="w-[200px]">{description}</h3>
      </div>
    </li>
  );

  const { scrollYProgress } = useScroll();

  const translateX = useTransform(
    scrollYProgress,
    [0.2, 0.4, 1],
    ["-3rem", "10rem", "-10rem"]
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["-9rem", "-9rem", "-20rem"]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 0.8, 0.7]);
  // const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.5, 1]);

  useEffect(() => {
    function handleScroll() {
      let currentPosition = window.scrollY; // Current position of the scroll in the y-axis

      let viewportHeight = window.innerHeight; // Current height of the viewport

      const lastPage = document.querySelector(".last-page");
      if (lastPage) {
        const adjustedProgress =
          (currentPosition - 2 * viewportHeight) / viewportHeight;
        const scaleFactor = Math.pow(adjustedProgress - 0.8, 2) * 4;
        lastPage.style.transform = `scaleY(${Math.max(0, scaleFactor)})`;
        lastPage.style.transformOrigin = "top";
      }

      const headingCover = document.querySelector(".heading-cover");

      const firstPage = document.querySelector(".first-page");
      const firstPageStart = firstPage.offsetTop;
      const firstPageHeight = firstPage.offsetHeight;
      const firstPageBottom = firstPageStart + firstPageHeight;

      if (firstPage) {
        if (
          currentPosition >= firstPageStart &&
          currentPosition <= firstPageBottom
        ) {
          const progress = (currentPosition - firstPageStart) / firstPageHeight;
          const visibleCount = Math.floor(progress * 11); // Assuming 7 RoadmapItems and 8 distances to cover

          if (headingCover) {
            headingCover.style.transform = `translate(15rem, -15rem) scaleX(${Math.max(
              0,
              1 - progress * 3
            )})`;
          }

          setVisibleItems(Array.from({ length: visibleCount }, (_, i) => i));
          setPseudoSvgHeight(progress * 300);
        } else if (currentPosition < firstPageStart) {
          setVisibleItems([]);
          setPseudoSvgHeight(0);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-container text-white relative overflow-hidden box-border">
      <div className="first-page h-full p-16 bg-black relative box-border overflow-hidden">
        <div >
          <img
            className="logo mb-[3rem] translate-x-[-1rem]"
            src={logo}
            alt="company-logo"
          />
        </div>
        {/* delete my logo and insert your own logo there. take note of the path to the asset folder that has the logo image file */}
        <div className="main-info sticky top-[50%] h-full box-border ">
          <h2 className="text-7xl font-bold translate-x-[15rem]">
            EXPLORE MY
          </h2>
          <div className="destinations text-7xl font-bold">
            {destinations.map((item, i) => {
              return (
                <li key={i} className="list-none">
                  {item}
                </li>
              );
            })}
          </div>
          <div className="heading-cover translate-x-[25rem] translate-y-[-15rem]"></div>
        </div>
        <motion.div
          style={{ translateY, translateX, scale }}
          transition={{ ease: "backInOut" }}
          className="roadmap z-[100] relative h-[1200px] translate-x-[4rem] scale-y-[0] box-border"
        >
          <svg
            className="roadmap-line absolute top-0 left-0 w-full h-[100%]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 800"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80 C 3000 -70, 5200 50, 1900 400 S 9000 2000, 9000 200"
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
          </svg>
          <svg
            className="pseudo-roadmap-line absolute top-0 left-0 w-full h-[100%]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 800"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80 C 3000 -70, 5200 50, 1900 400 S 9000 2000, 9000 200"
              stroke="#ffb832"
              fill="none"
              strokeWidth="3"
              strokeDasharray="370%"
              strokeDashoffset={`${28 - pseudoSvgHeight * 1.4}%`}
            />
          </svg>

          <ul className="box-border">
            <RoadmapItem
              date="2023 -> Q4 2023"
              title="Genesis"
              description="- Learned Vanilla HTML, CSS and JS"
              classes="translate-y-[2rem] border-[#ffb832] text-customOrange"
              newClass="translate-y-[5rem]"
              index={0}
            />
            <RoadmapItem
              date="Q1 2024"
              title="AWS ReSt@rt Learner"
              description="- Gained Cloud Computing Fundamentals."
              classes="translate-x-[29rem] translate-y-[-16rem] border-[#ffb832] text-customOrange"
              newClass="translate-x-[29rem] translate-y-[-12rem]"
              index={1}
            />
            <RoadmapItem
              date="Q2 2024"
              title="Meta CraftLab Internship"
              description="- Fullstack development with Svelte and SvelteKit."
              classes="translate-x-[55rem] translate-y-[-27rem] border-[#ffb832] text-customOrange"
              newClass="translate-x-[55rem] translate-y-[-24rem]"
              index={2}
            />
            <RoadmapItem
              date="Q2 2024"
              title="Personal Development"
              description="- Introduction to React js."
              classes="translate-x-[60rem] translate-y-[-19rem] border-[#ffb832] text-customOrange"
              newClass="translate-x-[60rem] translate-y-[-16rem]"
              index={3}
            />
              <RoadmapItem
                date="Q3 2024"
                title="Personal Development"
                description="- Data Structures and Algorithm."
                classes="translate-x-[45rem] translate-y-[-21rem] border-[#ffb832] text-customOrange"
                newClass="translate-x-[45rem] translate-y-[-18rem]"
                index={4}
                />
            <RoadmapItem
              title="Project Based Learning"
              description="- Built a portfolio website."
              date="Q3 2024"
              classes="translate-x-[24rem] translate-y-[-13rem] border-[#ffb832] text-customOrange"
              newClass="translate-x-[24rem] translate-y-[-10rem]"
              index={5}
            />
            <RoadmapItem
              date="Q4 2024"
              title="Project Based Learning"
              description="- Built an E-commerce Website."
              classes="translate-x-[33rem] translate-y-[-4rem] border-[#ffb832] text-customOrange"
              newClass="translate-x-[33rem] translate-y-[0.5rem]"
              index={6}
            />
          </ul>
        </motion.div>
      </div>
      <div className="h-[100vh]">
        <p className="last-page scale-y-0"></p>
      </div>
    </div>
  );
};

export default Home;