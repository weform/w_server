module ApplicationHelper
  def default_meta_tags

    title = @seo.try(:[], :title) || 'Weform'
    des = @seo.try(:[], :des) || 'site_desc'
    keywords = @seo.try(:[], :keywords) || 'Weform'
    image = @seo.try(:[], :image) || ''
    reverse = @seo.try(:[], :reverse).nil? ? true : false

    {
      site: 'Weform',
      title: title,
      reverse: reverse,
      description: des,
      keywords: keywords,
      og: {
        url: request.original_url,
        title: title,
        type: 'website',
        site_name: '机器之心'
      },
      twitter: {
        card: 'summary',
        site: '@SyncedTech',
        title: title,
        description: des,
        image: image
      }
    }
  end

  def page_id
    [controller_name, action_name].compact.flatten.join('-')
  end
end
