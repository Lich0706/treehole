import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

// import { giphy404, messages } from '@/config';
// import { messages } from '@/config';

function TreeHole() {
  return (
    <Container sx={{ height: '100%' }}>
      <FullSizeCenteredFlexBox flexDirection="column">
        {/* <iframe
          src={giphy404}
          width="100%"
          height="50%"
          style={{ maxHeight: '60%', maxWidth: '100%' }}
          frameBorder="0"
          allowFullScreen
        /> */}
        <CenteredFlexBox flexDirection="column">
          <Typography sx={{ mt: 2 }} variant="h4" color="info">
            树洞
          </Typography>
          {/* <Divider variant="middle" />
          <Typography variant="h4" sx={{ color: (theme) => theme.palette.info.main }}>
            {messages[404]}
          </Typography> */}
        </CenteredFlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

export default TreeHole;
