require 'active_model'

class ResourceKey
  attr_accessor :friendly_name, :key, :editable, :type
  
  def initialize(friendly_name, key, editable, type)
    @friendly_name, @key, @editable, @type = friendly_name, key, editable, type
  end
  
  def self.all
    resource_keys = []
  end
  
end