import dayjs from 'dayjs'

export const formatDate = (date) => {
  const dateString = date.slice(0, 10)
  return dayjs(dateString).format('YYYY/MM/DD')
}

export const formateCurrency = (value) =>
  Number(value).toLocaleString('en-Us', {
    style: 'currency',
    currency: 'USD',
  })

export const stringAvatar = (name) => {
  const nameArray = name.split(' ')

  if (nameArray.length > 1) {
    return {
      children: `${nameArray[0][0]}${nameArray[1][0]}`,
    }
  }

  return {
    children: `${nameArray[0][0]}`,
  }
}
