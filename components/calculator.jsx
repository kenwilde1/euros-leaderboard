"use client"

import { EuiFieldNumber, EuiForm, EuiFormRow, EuiFlexGroup, EuiFlexItem, EuiTitle } from "@elastic/eui";

import { useState } from "react";

const Calculator = () => {
    const [predictionHome, setPredictionHome] = useState()
    const [predictionAway, setPredictionAway] = useState()
    const [actualHome, setActualHome] = useState()
    const [actualAway, setActualAway] = useState()

    const onPredictionHomeChange = (e) => {
        const value = e.target.value;
        setPredictionHome(value);
    }

    const onPredictionAwayChange = (e) => {
        const value = e.target.value;
        setPredictionAway(value);
    }

    const onActualHomeChange = (e) => {
        const value = e.target.value;
        setActualHome(value);
    }

    const onActualAwayChange = (e) => {
        const value = e.target.value;
        setActualAway(value);
    }

    const calculatePoints = () => {
        let runningPoints = 0;

        if (predictionHome !== undefined &&
            predictionAway !== undefined &&
            actualHome !== undefined &&
            actualAway !== undefined) {
                if (predictionHome === actualHome) {
                    runningPoints += 1;
                }
        
                if (predictionAway === actualAway) {
                    runningPoints += 1;
                }
        
                if (predictionHome > predictionAway && actualHome > actualAway) {
                    runningPoints += 3;
                }
        
                if (predictionHome < predictionAway && actualHome < actualAway) {
                    runningPoints += 3;
                }
        
                if (predictionHome === predictionAway && actualHome === actualAway) {
                    runningPoints += 3;
                }
            }

        return runningPoints;
    }


    return (
       <EuiForm component='form'>
        <div className="prediction-form">
            <EuiTitle size="xs"><h5>Prediction</h5></EuiTitle>
            <div className="prediction-content">
                <EuiFormRow label="Home goals" className="number-input">
                    <EuiFieldNumber
                        value={predictionHome}
                        onChange={(e) => onPredictionHomeChange(e)}
                    />
                </EuiFormRow>
                <EuiFormRow label="Away goals" className="number-input">
                <EuiFieldNumber
                        value={predictionAway}
                        onChange={(e) => onPredictionAwayChange(e)}
                    />
                </EuiFormRow>
            </div>
        </div>
        <div className="actual-form">
            <EuiTitle size="xs"><h5>Actual</h5></EuiTitle>
            <div className="actual-content">
                <EuiFormRow label="Home goals" className="number-input">
                <EuiFieldNumber
                        value={actualHome}
                        onChange={(e) => onActualHomeChange(e)}
                    />
                </EuiFormRow>
                <EuiFormRow label="Away goals" className="number-input">
                <EuiFieldNumber
                        value={actualAway}
                        onChange={(e) => onActualAwayChange(e)}
                    />
                </EuiFormRow>
            </div>
        </div>
        <div className="points">
            Points: {calculatePoints()}
        </div>
        </EuiForm>
    );
}

export default Calculator;