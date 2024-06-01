import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { getCookie } from '@/utils/cookie';

function UserProfile() {
  const username = getCookie('username');
  console.log(username);
  return (
    <>
      <Meta title="UserProfile" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">username: {username}</Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default UserProfile;
