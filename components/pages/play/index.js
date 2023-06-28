import { useRef, useState, useEffect } from "react";
import soundOffIcon from "@/public/icons/sound--off.svg";
import soundOnIcon from "@/public/icons/sound--on.svg";
import Image from "next/image";
import Row from "./row";
import Card from "./card";
import moonIcon from "@/public/icons/moon.svg";
import starIcon from "@/public/icons/star.svg";
import sunIcon from "@/public/icons/sun.svg";
import cometIcon from "@/public/icons/comet.svg";
import Modal from "./modal";
import { useRouter } from "next/router";

const incorrectModalID = "incorrect";
const correctModalID = "correct";

const cardsData = [
  { type: "star", flipped: false, failed: false },
  { type: "sun", flipped: false, failed: false },
  { type: "moon", flipped: false, failed: false },
  { type: "comet", flipped: false, failed: false },
  { type: "star", flipped: false, failed: false },
  { type: "sun", flipped: false, failed: false },
  { type: "moon", flipped: false, failed: false },
  { type: "comet", flipped: false, failed: false },
];

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const fillSrc = (array) => {
  return array.map((data) => {
    let src;

    switch (data.type) {
      case "moon":
        src = moonIcon;
        break;
      case "comet":
        src = cometIcon;
        break;
      case "sun":
        src = sunIcon;
        break;
      case "star":
        src = starIcon;
        break;
    }

    return { ...data, src };
  });
};

const Play = () => {
  const [seconds, setSeconds] = useState(30);
  const [sound, setSound] = useState(false);
  const backgroundSoundRef = useRef();
  const tickingSoundRef = useRef();
  const incorrectSoundRef = useRef();
  const correctSoundRef = useRef();
  const [customCardsData, setCustomCardsData] = useState([]);
  const [firstSelected, setFirstSelected] = useState(null);
  const [secondSelected, setSecondSelected] = useState(null);
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cards = shuffle([...cardsData]);
    const cardsWithSrc = fillSrc([...cards]);

    setCustomCardsData(cardsWithSrc.map((data, i) => ({ ...data, id: i })));
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds - 1 === 0) clearInterval(countdown);

        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  useEffect(() => {
    if (seconds <= 10) {
      tickingSoundRef.current.play();
    }

    if (seconds === 0) {
      tickingSoundRef.current.pause();
      backgroundSoundRef.current.pause();

      router.push("/finished?message=Oops you didn’t find them all");
    }

    if (seconds < 0) setSeconds(0);
  }, [seconds, sound, router]);

  const soundHandler = () => {
    if (!sound) {
      backgroundSoundRef.current.play();
    } else {
      backgroundSoundRef.current.pause();
    }

    setSound(!sound);
  };

  const showModal = (id) => {
    const { Modal: ModalB } = require("bootstrap");
    const modal = new ModalB(`#${id}`);

    modal.show();
  };

  const flipHandler = (data) => {
    if (firstSelected && secondSelected) return;

    setCustomCardsData(
      customCardsData.map((cardData) => {
        if (cardData.id === data.id) {
          if (firstSelected === null) {
            setFirstSelected(cardData);
          } else if (secondSelected === null) {
            setSecondSelected(cardData);

            if (firstSelected.type === cardData.type) {
              if (count + 1 >= 4) {
                router.push("/finished?message=You did it");
              } else {
                showModal(correctModalID);
                correctSoundRef.current.play();
                setFirstSelected(null);
                setSecondSelected(null);
                setCount(count + 1);
              }
            } else {
              setTimeout(() => {
                setCustomCardsData(
                  customCardsData.map((data) => {
                    if (data.id === firstSelected.id || data.id === cardData.id)
                      return { ...data, flipped: false, failed: true };

                    return data;
                  })
                );

                setFirstSelected(null);
                setSecondSelected(null);

                showModal(incorrectModalID);
                incorrectSoundRef.current.play();
              }, 2000);
            }
          }

          return { ...cardData, flipped: true };
        }

        return cardData;
      })
    );
  };

  return (
    <>
      <main className="min-vh-100 d-flex flex-column">
        <div className="d-flex justify-content-between p-3 align-items-center">
          <p className="m-0">Time Left: {seconds}s</p>
          <button onClick={soundHandler}>
            {sound && <Image src={soundOnIcon} alt="Sound On" />}
            {!sound && <Image src={soundOffIcon} alt="Sound Off" />}
          </button>
        </div>
        <div className="flex-grow-1 container h-100 align-items-center justify-content-center d-grid">
          <Row customStyles="align-items-end">
            {customCardsData.slice(0, 4).map((data) => (
              <Card
                key={data.id}
                flipped={data.flipped}
                src={data.src}
                flipHandler={() => flipHandler(data)}
                failed={data.failed}
              />
            ))}
          </Row>
          <Row>
            {customCardsData.slice(-4).map((data) => (
              <Card
                key={data.id}
                src={data.src}
                flipHandler={() => flipHandler(data)}
                flipped={data.flipped}
                failed={data.failed}
              />
            ))}
          </Row>
        </div>
      </main>
      <audio ref={backgroundSoundRef} loop>
        <source src="/audio/background.mp3" type="audio/mp3" />
      </audio>
      <audio ref={tickingSoundRef} loop>
        <source src="/audio/ticking.mp3" type="audio/mp3" />
      </audio>
      <audio ref={incorrectSoundRef}>
        <source src="/audio/incorrect.mp3" type="audio/mp3" />
      </audio>
      <audio ref={correctSoundRef}>
        <source src="/audio/correct.mp3" type="audio/mp3" />
      </audio>
      <Modal
        id={incorrectModalID}
        title="Try Again!"
        desc="Sorry, but this is not a match."
      />
      <Modal
        id={correctModalID}
        title="Keep Going!"
        desc="Nice! it’s a match"
      />
    </>
  );
};

export default Play;
