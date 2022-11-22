import {
  FC,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  CounterDisplay,
} from './ClassCounter';

interface CounterDisplayProps {
  count?: number
}

export const DisplayCounter: FC<CounterDisplayProps> = ({
  count,
}) => (
  <div>
    <h1>
      {count
        ? `Count is: "${count}"`
        : 'No count!'}
    </h1>
  </div>
);

DisplayCounter.defaultProps = {
  count: undefined,
};

type CounterButtonProps = {
  onClick: () => void
  children?: string | (() => string)
};

export const CounterButton: FC<CounterButtonProps> = ({
  onClick,
  children,
}) => {
  const text = useMemo(
    () => (typeof children === 'function'
      ? children()
      : children
    ),
    [children],
  );

  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
};

CounterButton.defaultProps = {
  children: undefined,
};

interface CounterProps {
  className?: string
}

const useCounter = (defaultValue = 0) => {
  const [count, setCount] = useState(defaultValue);

  const increment = useCallback(
    () => setCount(count + 1),
    [setCount, count],
  );

  const decrement = useCallback(
    () => setCount((c) => c - 1),
    [setCount],
  );

  return [count, increment, decrement] as const;
};

export const Counter: FC<CounterProps> = ({ className }) => {
  const [count, increment, decrement] = useCounter(0);

  const getDecrementText = useCallback(
    () => 'Decrement',
    [],
  );

  return (
    <div className={className}>
      <CounterDisplay count={count} />
      <CounterButton
        onClick={increment}
      >
        Increment
      </CounterButton>
      <CounterButton
        onClick={decrement}
      >
        {getDecrementText}
      </CounterButton>
    </div>
  );
};

Counter.defaultProps = {
  className: undefined,
};
