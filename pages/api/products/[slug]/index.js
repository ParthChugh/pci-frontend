const header = {
	location: true,
	// search: true,
	// wishlist: true,
	// cart: true,
	profile: true,
}

const props = {
	header,
}

export default function handler(req, res) {
  res.status(200).json(props)
}
