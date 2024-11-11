## DB

# Base Index

| pk            | sk                                   | ...attributes                         | notes                         |
| :------------ | :----------------------------------- | :------------------------------------ | :---------------------------- |
| USER#id       | PROFILE                              | Information about this user           |                               |
| USER#id       | SESSION#token                        | Session token for the user            | All sessions of the user      |
| USER#id       | ACCOUNT#providerId#providerAccountId | User’s account information            | Associate account of the user |
| URL#shortCode | URL#createdAt                        | Original URL, expirationTime, longUrl | Shortened URL item            |
|               |                                      |                                       |                               |

# Global Secondary Index (1)

| GSI1PK             | GSI1SK                    | ...attributes                         | notes                                  |
| :----------------- | :------------------------ | :------------------------------------ | :------------------------------------- |
| USER#email         | USER#email                | User’s email information              | For querying user by email             |
| SESSION#token      | SESSION#token             | Session token for the user            | To retrieve session by token           |
| ACCOUNT#providerId | ACCOUNT#providerAccountId | Account provider details              | To associate account by provider       |
| URL#shortCode      | URL#createdAt             | Original URL, expirationTime, longUrl | Access URL by short code and timestamp |
|                    |                           |                                       |                                        |

# Attribute Definitions

| Attribute         | Type   | Description                                                                                          |
| :---------------- | :----- | :--------------------------------------------------------------------------------------------------- |
| PK                | String | Partition key for the item (USER#userId, URL#shortCode).                                             |
| SK                | String | Sort key for the item (PROFILE, SESSION#token, ACCOUNT#providerId#providerAccountId, URL#createdAt). |
| userId            | String | Unique identifier for the user (present for user-related items).                                     |
| email             | String | User's email address, used for querying by email.                                                    |
| token             | String | Token for session management (only for session items).                                               |
| providerId        | String | ID of the account provider, used for associating external accounts.                                  |
| providerAccountId | String | ID of the user in the provider system, used for external account linking.                            |
| shortCode         | String | Shortened URL code (only for URL items).                                                             |
| longUrl           | String | Original URL (only for URL items).                                                                   |
| expires           | Number | Expiration timestamp for session or URL (optional).                                                  |
| createdAt         | Number | Timestamp for when URL or session was created.                                                       |
|                   |        |                                                                                                      |
