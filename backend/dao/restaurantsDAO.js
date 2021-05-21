let restaurants

export default class RestaurantsDAO{

    // Initial connection to db
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`,
            )
        }
    }
    // get queries
    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
      } = {}) {
        let query
        if (filters) {
            // used to filter for specfic entries. according to cuisin, zipcode etc
          if ("name" in filters) {
            query = { $text: { $search: filters["name"] } }
          } else if ("cuisine" in filters) {
            query = { "cuisine": { $eq: filters["cuisine"] } }
          } else if ("zipcode" in filters) {
            query = { "address.zipcode": { $eq: filters["zipcode"] } }
          }
        }

        let cursor
    
        // find all restaurants that match the query
        try {
          cursor = await restaurants
            .find(query)
        } catch (e) {
          console.error(`Unable to issue find command, ${e}`)
          return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    
        // limits the queries. defualt is 20
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
    
        try {
          const restaurantsList = await displayCursor.toArray()
          const totalNumRestaurants = await restaurants.countDocuments(query)
    
          return { restaurantsList, totalNumRestaurants }
        } catch (e) {
          console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`,
          )
          return { restaurantsList: [], totalNumRestaurants: 0 }
        }
      }
    
}



