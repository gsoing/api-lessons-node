# API Node
Un exemple d'implémentation d'api avec Nodejs. Ici on prend l'exemple d'un CRUD sur des tweets.
Les frameworks utilisés sont les suivants:
* Gestion de l'api : [express](http://expressjs.com/)
* Validation des payload : [express-validator](https://express-validator.github.io/docs/)
* ODM : [mongoose](https://mongoosejs.com/)

# Lock
On ajoute ici une gestion des verrous avec un REDIS, on ajoute les librairies suivantes :
* client [redis](https://github.com/NodeRedis/node-redis)
* gestionnaire de verrous [redlock](https://github.com/mike-marcacci/node-redlock)

L'architecture globale est présentée [ici](https://docs.google.com/presentation/d/185nADp4Ubqsoa1K7-75dtWa7SdZvK2OSkPAE0rhLglg/edit?usp=sharing)