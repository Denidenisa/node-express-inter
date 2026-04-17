const User = require("../models/user.model");

const userService = {
    
    find: async (query) => {
        try {
            const { search } = query;

            let firstnameFilter;
            let lastnameFilter;

            if (!search) {
                firstnameFilter = {};
                lastnameFilter = {};
            } else {
                const searchFilter = { $regex: new RegExp(search, 'i') };
                firstnameFilter = { firstname: searchFilter };
                lastnameFilter = { lastname: searchFilter };
            }

            const users = await User.find().or([firstnameFilter, lastnameFilter])
                .select(['_id', 'firstname', 'lastname', 'createdAt', 'updatedAt']);
            return users;

        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = userService;