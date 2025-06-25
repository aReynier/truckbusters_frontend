| Nom de la table | Nom du champs   | Type de données | Contraintes       | Format de données   | Longueur maximale | Définition du champs                                |
| --------------- | --------------- | --------------- | ----------------- | ------------------- | ----------------- | --------------------------------------------------- |
| appointment     | id_appoitment   | String          | UNIQUE - NOT NULL | 123456              |                   | Identifiant unique de la réservation                |
| appointment     | moment          | date            | NOT NULL          | aaaa-mm-dd-hh-mm-ss |                   | Date et heure de la réservation                     |
| appointment     | deck            | Number          | NOT NULL          | 1                   | 1                 | Nombre de ponts disponibles                         |
| company         | id_company      | String          | UNIQUE - NOT NULL | 123456              |                   | Identifiant unique de l'entreprise                  |
| company         | name            | String          | NOT NULL          | abcdefghij          | 100               | Nom de l'entreprise                                 |
| company         | email           | String          | NOT NULL          | abcdefghij          | 255               | Email de l'entreprise                               |
| company         | phone           | String          | NOT NULL          | abcdefghij          | 20                | Téléphone de l'entreprise                           |
| driver          | id_driver       | String          | UNIQUE - NOT NULL | 123456              |                   | Identifiant unique du conducteur                    |
| driver          | firstname       | String          | NOT NULL          | abcdefghij          | 50                | Prénom du conducteur                                |
| driver          | lastname        | String          | NOT NULL          | abcdefghij          | 50                | Nom de famille du conducteur                        |
| driver          | phone           | String          | NULL              | abcdefghij          | 20                | Téléphone du conducteur                             |
| truck           | id_truck        | String          | UNIQUE - NOT NULL | 123456              |                   | Identifiant unique du camion                        |
| truck           | brand           | String          | NOT NULL          | abcdefghij          | 50                | Marque du camion                                    |
| truck           | model           | String          | NOT NULL          | abcdefghij          | 50                | Modèle du camion                                    |
| truck           | license_plate   | String          | NOT NULL          | abcdefghij          | 15                | Plaque d'immatriculation du camion                  |
| information     | id_information  | String          | UNIQUE -NOT NULL  | 123456              |                   | Identifiant unique des informatiosn de Truckbusters |
| information     | opening_hour    | String          | NOT NULL          | abcdefghij          | 50                | Heures d'ouverture                                  |
| information     | address         | String          | NOT NULL          | abcdefghij          | 100               | Adresse de Truckbusters                             |
| information     | secretary_phone | String          | NOT NULL          | abcdefghij          | 20                | Téléphone de la secrétaire                          |
| information     | secretary_email | String          | NOT NULL          | abcdefghij          | 255               | Adresse email de la secrétaire                      |