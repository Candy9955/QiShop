// takes a reviews meta object and returns average rating and count
const calcAvgRating = (meta) => {
  const ratings = meta?.ratings
  if (!ratings) {
    return {}
  }

  const sum = Object.entries(ratings).reduce(
    (res, x) => res + Number(x[0]) * Number(x[1])
    , 0)
  const count = Object.entries(ratings).reduce(
    (res, x) => res + Number(x[1])
    , 0)
  const avgRating = Number((sum / count).toFixed(1))
  return { avgRating, count }
}

export default calcAvgRating
