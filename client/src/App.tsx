import React, { useState, useEffect } from "react";
import axios from "axios";

interface Template {
  title: string;
  cost: string;
  id: string;
  description: string;
  thumbnail: string;
  image: string;
}

const App: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentImage, setCurrentImage] = useState<Template | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/templates");
        if (response.data.templates) {
          setTemplates(response.data.templates);
          console.log(response.data.templates);
          setCurrentImage(response.data.templates[0]);
          console.log(response.data.templates[0]);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);
  const handleNext = () => {
    if (currentIndex + 4 < templates.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center font-sans max-w-[900px] my-5 mx-auto bg-white shadow-xl p-8">
      <h1 className="text-3xl font-semibold">Filmstrip View</h1>
      <div className="w-full border"></div>
      {currentImage && (
        <div className="flex flex-row items-start mb-8">
          <img
            src={`/images/large/${currentImage.image}`}
            alt={currentImage.title}
            className="max-w-xl w-1/2 h-96 mr-8"
          />
          <div className="text-left flex-1 text-sm flex flex-col gap-2">
            <h2>
              <span className="bg-neutral-600 text-white uppercase px-2 py-0.5 text-xs mr-2 rounded-sm">
                Title:
              </span>
              {currentImage.title}
            </h2>
            <hr />
            <p>
              <span className="bg-neutral-600 text-white uppercase px-2 py-0.5 text-xs mr-2 rounded-sm">
                Description:
              </span>{" "}
              {currentImage.description}
            </p>
            <hr />
            <p>
              <span className="bg-neutral-600 text-white uppercase px-2 py-0.5 text-xs mr-2 rounded-sm">
                Cost:
              </span>{" "}
              ${currentImage.cost}
            </p>
            <hr />
            <p>
              <span className="bg-neutral-600 text-white uppercase px-2 py-0.5 text-xs mr-2 rounded-sm">
                ID:
              </span>{" "}
              {currentImage.id}
            </p>
            <hr />
            <p>
              <span className="bg-neutral-600 text-white uppercase px-2 py-0.5 text-xs mr-2 rounded-sm">
                Thumbnail File:
              </span>{" "}
              {currentImage.thumbnail}
            </p>
            <hr />
            <p>
              <span className="bg-neutral-600 text-white uppercase px-2 py-0.5 text-xs mr-2 rounded-sm">
                Large Image File:
              </span>{" "}
              {currentImage.image}
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="bg-none border-none cursor-pointer disabled:opacity-50"
        >
          <img src="/images/previous.png" alt="Previous" className="w-8 h-8" />
        </button>
        <div className="flex h-42 overflow-hidden">
          {templates.slice(currentIndex, currentIndex + 4).map((template) => (
            <div
              key={template.id}
              className="flex flex-1 h-full flex-col items-center mx-2"
            >
              <img
                src={`/images/thumbnails/${template.thumbnail}`}
                alt={template.title}
                onClick={() => setCurrentImage(template)}
                className={`m-1 cursor-pointer border-2 h-full w-full ${currentImage?.id === template.id
                  ? "border-red-700 border-[6px]"
                  : "border-transparent"
                  }`}
              />
              <p
                className={`mt-1 text-xs ${currentImage?.id === template.id
                  ? "bg-red-700 text-white rounded-md p-1"
                  : ""
                  }`}
              >
                {template.id}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex + 4 >= templates.length}
          className="bg-none border-none cursor-pointer disabled:opacity-50"
        >
          <img src="/images/next.png" alt="Next" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default App;
