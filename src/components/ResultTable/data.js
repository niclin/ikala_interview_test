export const columns = [
  { key: 'trainNo', sortable: false },
  { key: 'originTime', sortable: true },
  { key: 'destinationTime', sortable: true },
  { key: 'duration', sortable: true },
  { key: 'price', sortable: true }
];

export const head = {
  trainNo: { text: '車次' },
  originTime: { text: '出發時間' },
  destinationTime: { text: '到達時間' },
  duration: { text: '行車時間' },
  price: { text: '票價' }
}
