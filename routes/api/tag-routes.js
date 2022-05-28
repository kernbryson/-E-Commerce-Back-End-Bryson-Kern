const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((tagData) => res.json(tagData), res.status(200))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((singleTag) => {
      if (!singleTag) {
        res.status(404).json({ message: "No product found!" });
        return;
      }
      res.json(singleTag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((newTag) => res.status(200).json(newTag))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
