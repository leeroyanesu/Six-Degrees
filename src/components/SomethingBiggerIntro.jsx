import React, { useState } from 'react';
import './SomethingBiggerIntro.css';

export const SomethingBiggerIntro = ({ onComplete }) => {
    const [hasWatched, setHasWatched] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState(new Set());
    const [showResult, setShowResult] = useState(false);
    const [showReward, setShowReward] = useState(false);

    const correctAnswers = new Set(['B', 'C']);

    const handleWatchedChange = (e) => {
        setHasWatched(e.target.checked);
    };

    const handleContinue = () => {
        if (hasWatched) {
            setShowQuiz(true);
        }
    };

    const handleAnswerToggle = (answer) => {
        const newSelected = new Set(selectedAnswers);
        if (newSelected.has(answer)) {
            newSelected.delete(answer);
        } else {
            newSelected.add(answer);
        }
        setSelectedAnswers(newSelected);
    };

    const handleSubmitQuiz = () => {
        const isCorrect = 
            selectedAnswers.size === correctAnswers.size &&
            [...selectedAnswers].every(answer => correctAnswers.has(answer));
        
        if (isCorrect) {
            setShowResult(true);
            setTimeout(() => {
                setShowReward(true);
            }, 500);
        } else {
            alert("Not quite! Think about what happens when people work together to create impact.");
        }
    };

    const handleFinish = () => {
        onComplete();
    };

    if (!onComplete) return null;

    return (
        <div className="something-bigger-overlay">
            <div className="something-bigger-popup">
                {!showQuiz && !showReward && (
                    <>
                        <h2 className="sb-title">Something Bigger</h2>
                        
                        <div className="video-container">
                            <video 
                                controls 
                                className="sb-video"
                                src="https://pluswonder.org/wp-content/uploads/2022/03/2nd-degree.mp4"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <p className="sb-description">
                            In this video two people work together to create something bigger than they could alone. 
                            This reaches and impacts more people than something they might have done by themselves.
                        </p>

                        <label className="sb-checkbox-label">
                            <input 
                                type="checkbox" 
                                checked={hasWatched}
                                onChange={handleWatchedChange}
                                className="sb-checkbox"
                            />
                            <span>I have watched</span>
                        </label>

                        <button
                            onClick={handleContinue}
                            disabled={!hasWatched}
                            className="sb-button"
                        >
                            CONTINUE
                        </button>
                    </>
                )}

                {showQuiz && !showReward && (
                    <>
                        <h2 className="sb-title">Reflection Question</h2>
                        
                        <p className="quiz-question">
                            What does "Something Bigger" mean in this story? (Choose two answers.)
                        </p>

                        <div className="quiz-options">
                            <label className={`quiz-option ${selectedAnswers.has('A') ? 'selected' : ''}`}>
                                <input 
                                    type="checkbox"
                                    checked={selectedAnswers.has('A')}
                                    onChange={() => handleAnswerToggle('A')}
                                />
                                <span>A. One person doing everything alone so they can get all the praise.</span>
                            </label>

                            <label className={`quiz-option ${selectedAnswers.has('B') ? 'selected' : ''}`}>
                                <input 
                                    type="checkbox"
                                    checked={selectedAnswers.has('B')}
                                    onChange={() => handleAnswerToggle('B')}
                                />
                                <span>B. Two people working together to create something they couldn't by themselves.</span>
                            </label>

                            <label className={`quiz-option ${selectedAnswers.has('C') ? 'selected' : ''}`}>
                                <input 
                                    type="checkbox"
                                    checked={selectedAnswers.has('C')}
                                    onChange={() => handleAnswerToggle('C')}
                                />
                                <span>C. Joining forces to reach and impact more people.</span>
                            </label>

                            <label className={`quiz-option ${selectedAnswers.has('D') ? 'selected' : ''}`}>
                                <input 
                                    type="checkbox"
                                    checked={selectedAnswers.has('D')}
                                    onChange={() => handleAnswerToggle('D')}
                                />
                                <span>D. Making the biggest or most perfect stone circle just to impress others.</span>
                            </label>
                        </div>

                        <button
                            onClick={handleSubmitQuiz}
                            disabled={selectedAnswers.size === 0}
                            className="sb-button"
                        >
                            SUBMIT ANSWER
                        </button>
                    </>
                )}

                {showReward && (
                    <>
                        <h2 className="sb-title reward-title">🎉 Impact Rewards</h2>
                        
                        <div className="reward-card">
                            <h3 className="reward-card-title">Connection Card Unlocked!</h3>
                            <div className="reward-card-name">Something Bigger – Key Idea</div>
                            <p className="reward-card-description">
                                "Something Bigger is what happens when people connect their purposes and support each other. 
                                Instead of trying to do everything alone, they work together in partnership, and what they 
                                create is bigger and more meaningful than anything they could have done by themselves."
                            </p>
                        </div>

                        <p className="continue-message">
                            Great! Now continue exploring to unlock more...
                        </p>

                        <button
                            onClick={handleFinish}
                            className="sb-button reward-button"
                        >
                            CONTINUE JOURNEY
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
