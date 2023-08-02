import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { Section } from 'components/Section/Section';
import { Notification } from './Notification/Notification';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Container } from 'components/App.styled';

export default function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const handleClick = key => {
    switch (key) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      default:
        break;
    }
  };

  const total = good + bad + neutral;
  const feedback = total > 0;

  const countPositiveFeedbackPercentage = () => {
    if (total === 0) {
      return 0;
    }

    const GoodFeedback = (good / total) * 100;
    return Math.round(GoodFeedback);
  };

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['bad', 'good', 'neutral']}
          handleClick={handleClick}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {feedback ? (
          <Statistics
            good={good}
            bad={bad}
            neutral={neutral}
            total={total}
            percentage={countPositiveFeedbackPercentage}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
}
