export default {
  name: 'promotion',
  title: 'Promotions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Promotion Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or other video platform URL'
    },
    {
      name: 'winners',
      title: 'Winners',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Winner Name',
            type: 'string'
          },
          {
            name: 'prize',
            title: 'Prize Won',
            type: 'string'
          },
          {
            name: 'image',
            title: 'Winner Image',
            type: 'image',
            options: {
              hotspot: true
            }
          }
        ]
      }]
    },
    {
      name: 'active',
      title: 'Active Promotion',
      type: 'boolean',
      description: 'Show this promotion on the website'
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime'
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime'
    }
  ]
} 