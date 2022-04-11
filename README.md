# Tennis Game API

This is a Tennis game API below all the endpoints you can use to use the API

## Installation

```bash
npm install 
```

## API Usage


# returns 'All Teams'
curl --location --request GET 'localhost:3000/api/teams'

# returns 'One Team'
curl --location --request GET 'localhost:3000/api/teams/{team-id}'

# returns 'All Players'
curl --location --request GET 'localhost:3000/api/teams/{team-id}/players'

# returns 'One Players'
curl --location --request GET 'localhost:3000/api/teams/{team-id}/players/{player-id}'

# Update Player
curl --location --request PUT 'localhost:3000/api/teams/{team-id}/players/{player-id}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=name' \
--data-urlencode 'age=22'

# Delete Player
curl --location --request DELETE 'localhost:3000/api/teams/{team-id}/players/{player-id}'

# Add Team
curl --location --request POST 'localhost:3000/api/teams' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'country=cont' \
--data-urlencode 'color=color' \
--data-urlencode 'year=2010'

# Update Team
curl --location --request PUT 'localhost:3000/api/teams/{team-id}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'country=countery-update' \
--data-urlencode 'year=2020'

# Delete Team
curl --location --request DELETE 'localhost:3000/api/teams/{team-id}'

# Add Player
curl --location --request POST 'localhost:3000/api/teams/{team-id}/players' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=player-name' \
--data-urlencode 'age=22'

```
## License
[MIU](https://compro.miu.edu)