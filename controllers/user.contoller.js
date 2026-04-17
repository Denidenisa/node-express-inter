const userService = require("../mongo/user.service");

const userController = {

    getAll: async (req, res) => {
        const query = req.query;

        try {
            const users = await userService.find(query);
            const dataToSend = {
                count: users.length,  
                users                
            };
            res.status(200).json(dataToSend);

        } catch (err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur avec la DB 🌐' });
        }
    },
}

module.exports = userController;