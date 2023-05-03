import { useState } from 'react'
import {
  Avatar,
  Box,
  Container,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useQuery } from 'react-query'
import { useAuthState } from '@context/AuthContext'
import { getUserProfile, findUserGames } from '@api/player'
import GamesHistoryTable from '@components/GamesHistoryTable'
import GameTypeRating from '@components/GameTypeRating'
import NewFriendDialog from '@components/NewFriendDialog'

const Games = () => {
  const [friendDialog, setFriendDialog] = useState(false)
  const { user } = useAuthState()
  const { _id } = user

  const { isLoading: loadingProfile, data: profile } = useQuery(
    ['playerProfile', _id],
    () => getUserProfile({ _id })
  )

  const { isLoading: loadingGames, data: games } = useQuery(
    ['playerGames', _id],
    () => findUserGames({ _id })
  )

  function handleToggleNewFriend() {
    setFriendDialog(!friendDialog)
  }

  console.log({ _id, loadingProfile, profile, loadingGames, games })

  return (
    <Container fixed>
      <Grid container spacing={2} m={1} alignItems='stretch'>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ height: '100%' }}>
            {loadingProfile ? (
              'loading...'
            ) : (
              <Box>
                <Grid
                  item
                  container
                  justifyContent='center'
                  alignItems='center'
                  gap={1}
                  p={3}
                >
                  <Avatar alt='Obrabo' src='' sx={{ width: 40, height: 40 }} />
                  <Typography variant='h6'>OBrabo</Typography>
                  <VerifiedIcon />
                </Grid>
                <Grid container justifyContent='space-around' px={3}>
                  <Grid item display='flex' alignItems='center' gap={1}>
                    <Box>
                      <GameTypeRating
                        type='BULLET_1'
                        value={profile.lastPlayerRatings.BULLET.value}
                      />
                    </Box>
                    <Box>
                      <GameTypeRating
                        type='BLITZ'
                        value={profile.lastPlayerRatings.BLITZ.value}
                      />
                    </Box>
                    <Box>
                      <GameTypeRating
                        type='RAPID'
                        value={profile.lastPlayerRatings.RAPID.value}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid item p={3} px={6}>
                  <Typography variant='body1'>
                    <strong>Country:</strong> Peru
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Member since:</strong> 01/01/2023
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Games played:</strong> 1357
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Victories:</strong> 764
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Draws:</strong> 143
                  </Typography>
                </Grid>
                <Grid
                  container
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  gap={1}
                  p={2}
                  px={4}
                >
                  <Grid item display='flex' alignItems='center' gap={1}>
                    <Typography variant='h5'>Friends</Typography>
                    <Fab
                      color='primary'
                      size='small'
                      aria-label='add'
                      onClick={handleToggleNewFriend}
                    >
                      <AddIcon />
                    </Fab>
                  </Grid>
                  <Grid item container>
                    <List
                      dense
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                      }}
                    >
                      {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`
                        return (
                          <ListItem key={value} disablePadding>
                            <ListItemButton>
                              <ListItemAvatar>
                                <Avatar
                                  alt={`Avatar n°${value + 1}`}
                                  src={''}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                id={labelId}
                                primary={`Player nickname here...`}
                              />
                            </ListItemButton>
                          </ListItem>
                        )
                      })}
                    </List>
                  </Grid>
                  <NewFriendDialog
                    open={friendDialog}
                    handleClose={handleToggleNewFriend}
                  />
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Paper>
            <Grid p={3}>
              <Grid item>
                <Typography variant='h6'>Games</Typography>
              </Grid>
              <GamesHistoryTable games={games} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Games
