import getData from "./getData.js";

// Render detail page
let detail = async (req, res) => {
  // Set url param values
  const apiKey = "tuMYha0ArdAhO9rqn9aM9erHww61XGns";
  try {
    const returnData = await getData(
      `https://api.giphy.com/v1/gifs/${req.params.id}?api_key=${apiKey}`
    );

    res.render("detail", {
      data: returnData.data,
      username: req.params.username,
    });
  } catch (error) {
    res.send("Error on path: /detail ");
  }
};

export default detail;
