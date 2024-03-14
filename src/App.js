import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "React is indeed a JavaScript library primarily designed for creating user interfaces (UIs) for web applications. It provides a component-based architecture, allowing developers to build reusable UI components that encapsulate their own state and behavior.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "As a home provides a centralized place for individuals to live and organize their belongings, state management provides a structured system for managing and maintaining the state (data) of an application.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "In React, props (short for properties) are a fundamental mechanism for passing data from parent components to child components. They serve as a way to configure and customize the behavior and appearance of a component, much like how an API defines the interface through which different software components interact.",
  },
];

export default function App() {
  return (
    <>
      <div>
        <h1>Tabbed Component</h1>
        <p>this is a tabbed component built with React JS</p>
      </div>
      <Tabbed content={content} />
    </>
  );
}


function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />

        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("RENDER");

  function handleInc() {
    setLikes((likes) => likes + 1);
  }

  function handleTripleInc() {
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    // setLikes(likes + 1);

    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
  }

  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
    console.log(likes);
  }

  function handleUndoLater() {
    setTimeout(handleUndo, 2000);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
      <p>
        because the other tab component unmount on adding this content, the
        state of other tab components is lost and reset
      </p>
    </div>
  );
}
