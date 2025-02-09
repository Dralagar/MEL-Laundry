export default {
  name: 'lottery',
  title: 'Lottery Announcements',
  type: 'document',
  fields: [
    {
      name: 'drawingDate',
      title: 'Drawing Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'winners',
      title: 'Winners',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'phoneNumber',
            title: 'Phone Number',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'prize',
            title: 'Prize Amount',
            type: 'number',
            validation: (Rule: any) => Rule.required()
          }
        ]
      }]
    },
    {
      name: 'announcementVideo',
      title: 'Announcement Video',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    }
  ]
}; 