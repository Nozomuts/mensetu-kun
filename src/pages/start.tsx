import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Screen } from "../components/Screen";
import { IStore } from "../redux";
import { AiOutlineDoubleRight, AiFillHome } from "react-icons/ai";

export default function Start() {
  const [questionNum, setQuestionNum] = useState(0);
  const questions = useSelector((state: IStore) => state.questions);

  useEffect(() => {
    if (questions.length === 0) {
      return;
    }
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    const voices = synth.getVoices();
    utter.voice = voices[0]; // 0, 58
    utter.lang = "ja-JP";
    utter.pitch = 1;
    utter.text = questions[questionNum].text;
    synth.speak(utter);
    const timer = setTimeout(() => {
      if (questionNum + 1 >= questions.length) {
        return;
      }
      setQuestionNum((prev) => prev + 1);
    }, 60000);
    return () => {
      clearTimeout(timer);
    };
  }, [questionNum, questions]);

  return (
    <div>
      <Screen />
      <div className="bg-black pb-4">
        <h2 className="text-2xl mb-4 text-white text-center">
          {questions.length > 0 && questions[questionNum].text}
        </h2>
      </div>
      <div className="flex justify-center border-2 p-4">
        <button className="command mr-4" onClick={() => Router.push("/")}>
          <AiFillHome size={30} />
        </button>
        {questionNum + 1 < questions.length && (
          <button
            className="command"
            onClick={() => setQuestionNum((prev) => prev + 1)}
          >
            <AiOutlineDoubleRight size={30} />
          </button>
        )}
      </div>
    </div>
  );
}
