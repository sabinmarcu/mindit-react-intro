/* eslint-disable max-classes-per-file */

import {
  Component,
  PureComponent,
} from 'react';

interface CounterDisplayProps {
  count?: number
}

export class CounterDisplay extends PureComponent<CounterDisplayProps> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    count: undefined,
  };

  render() {
    const { count } = this.props;
    if (count === undefined) {
      return <h1>No count!</h1>;
    }
    return (
      <div>
        <h1>
          Count is: &quot;
          {count}
          &quot;
        </h1>
      </div>
    );
  }
}

interface CounterButtonProps {
  onClick: () => void
  children?: string
}

export class CounterButton extends PureComponent<
CounterButtonProps
> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    children: undefined,
  };

  render() {
    const { onClick, children } = this.props;

    return (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    );
  }
}

interface CounterProps {
  className?: string
}

interface CounterState {
  count: number
}

export class Counter extends Component<CounterProps, CounterState> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    className: undefined,
  };

  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState((oldState) => ({ count: oldState.count + 1 }));
  };

  decrement = () => {
    this.setState((oldState) => ({ count: oldState.count - 1 }));
  };

  render() {
    const { count } = this.state;
    const { className } = this.props;
    return (
      <div className={className}>
        <CounterDisplay count={count} />

        <CounterButton onClick={this.increment}>
          Increment
        </CounterButton>
        <CounterButton onClick={this.decrement}>
          Decrement
        </CounterButton>
      </div>
    );
  }
}
