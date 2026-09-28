# Architecture
React client → REST/Socket.IO → Express controllers/services → MongoDB. Services isolate matching, donation lifecycle, notifications and impact calculations. Exact locations are returned only to authorized transaction participants.
