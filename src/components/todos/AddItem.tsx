import {
  FC,
  useCallback,
} from 'react';
import {
  useInput,
  Validator,
} from '../hooks/useInput';
import {
  Card,
} from '../layout/Card';
import styles from './AddItem.module.css';
import {
  useTodoAdd,
} from './useTodos';

const forbiddenCharacters = "$&+,:;=?@#|'<>.^*()%!-";
const isEmpty: Validator = (value: string) => (value.trim().length === 0
  ? 'Must not be empty'
  : undefined);
const forbiddenCharactersRegex = new RegExp(`[${forbiddenCharacters}]`);
const hasForbiddenCharacters: Validator = (value: string) => (value.match(forbiddenCharactersRegex)
  ? `Must not include any of the following characters: ${forbiddenCharacters}`
  : undefined);
const hasLength: Validator = (value: string) => ((value.length > 50)
  ? 'Must not be longer than 50 characters'
  : undefined);

const validators = [isEmpty, hasForbiddenCharacters, hasLength];

export const AddItem: FC = () => {
  const {
    value, onChange, isValid, errors, isTouched, reset,
  } = useInput('', validators);
  const addItem = useTodoAdd();
  const onSubmit = useCallback(
    () => {
      if (isValid) {
        addItem(value);
        reset();
      }
    },
    [isValid, value, addItem, reset],
  );
  return (
    <Card>
      <div className={styles.Wrapper}>
        <input
          type="text"
          className={[
            styles.Input,
            isTouched && (isValid ? styles.Valid : styles.Invalid),
          ].filter(Boolean).join(' ')}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className={styles.Button}
          disabled={!isValid}
          onClick={onSubmit}
        >
          Add

        </button>
      </div>
      {isTouched && !isValid
        ? (
          <div>
            {errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        )
        : null }
    </Card>
  );
};