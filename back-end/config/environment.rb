if File.exist?(File.join(__dir__, '..', '.env'))
  File.readlines(File.join(__dir__, '..', '.env')).each do |line|
    next if line.strip.empty? || line.start_with?('#')
    key, value = line.strip.split('=', 2)
    ENV[key] = value if key && value
  end
end
