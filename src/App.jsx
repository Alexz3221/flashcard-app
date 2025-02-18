import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Each step object includes:
 * - id: unique identifier (key for 'steps')
 * - label: user-friendly label displayed in the final review
 * - recordResponse: boolean => if true, shows a <textarea> + "Save & Continue"
 * - content: static JSX or instructions
 * - options: array of { text, next }
 *   - If recordResponse = true => usually 1 option => "Save & Continue"
 *   - If recordResponse = false => multiple branching options => we store the chosen button text
 * - getContent: optional function for dynamic rendering (used in 'review')
 */

const steps = {
  // =============================
  // 1) Welcome
  // =============================
  step1: {
    id: "step1",
    label: "Welcome",
    recordResponse: false,
    skipInReview: true,    
    content: (
      <>
        <h2>Welcome</h2>
        <p>
          Welcome to the Interview Tool for users over 50. This tool will help
          you gather insights about digital interfaces. Click{" "}
          <strong>Begin Interview</strong> to start.
        </p>
      </>
    ),
    options: [{ text: "Begin Interview", next: "step2" }],
  },

  // =============================
  // 2) Choose a Path
  // =============================
  step2: {
    id: "step2",
    label: "Initial Choice: Good Tech or Bad Tech",
    recordResponse: false,
    skipInReview: true,   
    content: (
      <>
        <h2>Choose a Path</h2>
        <p>
          Let's start with <strong>Good Technology</strong> or skip straight to{" "}
          <strong>Bad Technology</strong>. Which do you want to talk about
          first?
        </p>
      </>
    ),
    options: [
      { text: "Good Tech", next: "good1" },
      { text: "Bad Tech", next: "bad1" },
    ],
  },

  // =============================
  // GOOD TECH BRANCH
  // =============================
  good1: {
    id: "good1",
    label: "Piece of Tech Liked",
    recordResponse: true,
    content: (
      <>
        <h2>Identify Good Technology</h2>
        <p>Which technology do you like and feel comfortable using?</p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "good2" }],
  },
  good2: {
    id: "good2",
    label: "Initial Impression (Good Tech)",
    recordResponse: false,
    content: (
      <>
        <h2>Initial Impression</h2>
        <p>Did you like using it right away, or did your feelings grow later?</p>
      </>
    ),
    options: [
      { text: "Liked It Right Away", next: "good3a" },
      { text: "Positive Feelings Grew Over Time", next: "good3b" },
    ],
  },
  good3a: {
    id: "good3a",
    label: "Easy from the Start (Good Tech)",
    recordResponse: true,
    content: (
      <>
        <h2>Easy from the Start</h2>
        <p>What made it user-friendly for beginners?</p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "good4" }],
  },
  good3b: {
    id: "good3b",
    label: "Confusing at First (Good Tech)",
    recordResponse: true,
    content: (
      <>
        <h2>Confusing at First</h2>
        <p>Why was it confusing at first, and what changed over time?</p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "good4" }],
  },
  good4: {
    id: "good4",
    label: "Missing/Excess (Good Tech)",
    recordResponse: true,
    content: (
      <>
        <h2>Missing or Excess Features?</h2>
        <p>
          Is something missing or are there too many features? How would you
          improve it?
        </p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "step3" }],
  },

  // =============================
  // BAD TECH BRANCH
  // =============================
  bad1: {
    id: "bad1",
    label: "Piece of Tech Disliked",
    recordResponse: true,
    content: (
      <>
        <h2>Identify Bad Technology</h2>
        <p>Which technology do you dislike or find uncomfortable?</p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "bad2" }],
  },
  bad2: {
    id: "bad2",
    label: "Initial Dislike or Over Time (Bad Tech)",
    recordResponse: false,
    content: (
      <>
        <h2>Immediate or Gradual Dislike</h2>
        <p>Did you dislike it immediately, or did negative feelings appear over time?</p>
      </>
    ),
    options: [
      { text: "Disliked Immediately", next: "bad3a" },
      { text: "Frustration Over Time", next: "bad3b" },
    ],
  },
  bad3a: {
    id: "bad3a",
    label: "Immediate Dislike (Bad Tech)",
    recordResponse: true,
    content: (
      <>
        <h2>Immediate Dislike</h2>
        <p>What made it frustrating from the start? Did it replace something else?</p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "bad4" }],
  },
  bad3b: {
    id: "bad3b",
    label: "Gradual Frustration (Bad Tech)",
    recordResponse: true,
    content: (
      <>
        <h2>Gradual Frustration</h2>
        <p>
          What features became problematic over time? Why do you think they
          showed up later?
        </p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "bad4" }],
  },
  bad4: {
    id: "bad4",
    label: "Missing/Excess (Bad Tech)",
    recordResponse: true,
    content: (
      <>
        <h2>Missing or Excess Features?</h2>
        <p>
          Is something missing or are there too many features? Any part you
          actually like about it?
        </p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "step3" }],
  },

  // =============================
  // Emotions & Learning
  // =============================
  step3: {
    id: "step3",
    label: "Emotions about New Tech",
    recordResponse: true,
    content: (
      <>
        <h2>Emotions about New Tech</h2>
        <p>How does using new technology make you feel, and why?</p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "step4" }],
  },

  step4: {
    id: "step4",
    label: "Best & Worst Tech Memories",
    recordResponse: true,
    content: (
      <>
        <h2>Best & Worst Tech</h2>
        <p>
          What was the best technology you've used? Why? And the worst? Why was
          it so bad?
        </p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "step5" }],
  },

  step5: {
    id: "step5",
    label: "Learning Style",
    recordResponse: true,
    content: (
      <>
        <h2>Learning Style</h2>
        <p>
          How easy is it for you to learn new tech? Why? How do you feel about
          tutorials, videos, in-person training, or gamified learning?
        </p>
      </>
    ),
    options: [{ text: "Save & Continue", next: "review" }],
  },

  // =============================
  // REVIEW - dynamic content
  // =============================
  review: {
    id: "review",
    label: "Final Review",
    recordResponse: false,
    getContent: (responses) => (
      <>
        <h2>Review Your Responses</h2>
        {Object.keys(responses).length === 0 ? (
          <p>
            <em>No responses recorded.</em>
          </p>
        ) : (
          <ul style={{ textAlign: "left" }}>
            {Object.entries(responses).map(([stepId, answer]) => {
              // If the step has a label, use that; otherwise fallback to stepId
              const stepLabel = steps[stepId]?.label || stepId;
              return (
                <li key={stepId} style={{ marginBottom: "10px" }}>
                  <strong>{stepLabel}:</strong> {answer}
                </li>
              );
            })}
          </ul>
        )}
      </>
    ),
    options: [{ text: "Finish Interview", next: "stepEnd" }],
  },

  // =============================
  // END
  // =============================
  stepEnd: {
    id: "stepEnd",
    label: "Conclusion",
    recordResponse: false,
    content: (
      <>
        <h2>Conclusion</h2>
        <p>Thank you for completing the interview! You can restart below.</p>
      </>
    ),
    options: [{ text: "Restart Interview", next: "step1" }],
  },
};

export default function FlashcardApp() {
  const [step, setStep] = useState("step1");
  const [responses, setResponses] = useState({});

  const currentStep = steps[step];

  /**
   * storeBranchChoice: for branching steps (recordResponse=false),
   * we store which button text was clicked.
   */
  function storeBranchChoice(stepId, option) {
    const stepObj = steps[stepId];
    // If this step is not flagged to skip, record the choice
    if (!stepObj.skipInReview) {
      setResponses((prev) => ({
        ...prev,
        [stepId]: `You selected: ${option.text}`,
      }));
    }
    // Move on
    setStep(option.next);
  }
  /**
   * saveResponse: for text-area steps (recordResponse=true),
   * we store the typed value in responses[stepId].
   */
  const saveResponse = (currentStepId, nextStepId) => {
    const textarea = document.getElementById("responseInput");
    if (textarea) {
      const userText = textarea.value.trim();
      if (userText.length > 0) {
        setResponses((prev) => ({
          ...prev,
          [currentStepId]: userText,
        }));
      }
    }
    setStep(nextStepId);
  };

  // Renders either step.content or step.getContent(responses)
  const renderStepContent = () => {
    if (typeof currentStep.getContent === "function") {
      return currentStep.getContent(responses);
    }
    return currentStep.content;
  };

  return (
    <div className="container">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Interview Tool</h1>
      </motion.header>

      <AnimatePresence mode="wait">
        <motion.section
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ marginBottom: "20px" }}>{renderStepContent()}</div>

          {/* If recordResponse => single <textarea> + 'Save & Continue' */}
          {currentStep.recordResponse && (
            <div style={{ marginBottom: "20px" }}>
              <textarea
                id="responseInput"
                placeholder="Record your response here..."
                style={{
                  width: "100%",
                  height: "100px",
                  margin: "10px 0",
                  background: "#333",
                  color: "#fff",
                  borderRadius: "4px",
                  border: "1px solid #777",
                  padding: "8px",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => saveResponse(step, currentStep.options[0].next)}
                style={{
                  background: "#ffcc00",
                  color: "black",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  margin: "10px 5px",
                }}
              >
                {currentStep.options[0].text}
              </motion.button>
            </div>
          )}

          {/* If !recordResponse => multiple branching buttons */}
          {!currentStep.recordResponse && (
            <div className="button-container">
              {currentStep.options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => storeBranchChoice(step, option)}
                  style={{
                    background: "#ffcc00",
                    color: "black",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    margin: "10px 5px",
                  }}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
