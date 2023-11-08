import dayjs from 'dayjs'

export const formatDate = (date) => dayjs(date).format('YYYY/MM/DD')

export const formateCurrency = (value) =>
  Number(value).toLocaleString('en-Us', {
    style: 'currency',
    currency: 'USD',
  })

export const stringAvatar = (name) => {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}
