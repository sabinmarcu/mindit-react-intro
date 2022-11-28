import {
  FormControlLabel,
  FormGroup,
  Switch,
} from '@mui/material';
import {
  FC,
  useCallback,
} from 'react';
import {
  useRecoilState,
} from 'recoil';
import {
  authState,
} from '../../stores/auth';

export const AuthButton: FC = () => {
  const [hasAuth, setHasAuth] = useRecoilState(authState);
  const onToggle = useCallback(
    () => setHasAuth((prev) => !prev),
    [setHasAuth],
  );
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={hasAuth} onChange={onToggle} />}
        label="Authenticated"
      />
    </FormGroup>
  );
};
