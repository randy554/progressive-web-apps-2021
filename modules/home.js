import getData from "./getData.js";

// Render home page
let home = async (req, res) => {
  try {
    // Set url param values
    const apiKey = "tuMYha0ArdAhO9rqn9aM9erHww61XGns";
    const gifLimit = 12;
    const rating = "g";

    const returnData = await getData(
      `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${gifLimit}&rating=${rating}`
    );

    res.render("index", {
      data: returnData.data,
    });
  } catch (error) {
    res.send("Error on path: / ");
  }
};

export default home;
