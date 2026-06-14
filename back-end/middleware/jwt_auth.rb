require 'jwt'

module Middleware
  class JwtAuth
    SECRET = ENV['JWT_SECRET'] || 'itsu_dev_secret_2026'

    def self.encode(payload)
      payload[:exp] = Time.now.to_i + 86400 * 7
      JWT.encode(payload, SECRET, 'HS256')
    end

    def self.decode(token)
      decoded = JWT.decode(token, SECRET, true, algorithm: 'HS256')
      decoded[0]
    rescue JWT::DecodeError
      nil
    end

    def self.extract_token(env)
      auth = env['HTTP_AUTHORIZATION'] || env['Authorization'] || ''
      auth.sub(/^Bearer\s+/i, '')
    end

    def self.authenticate(env)
      token = extract_token(env)
      return nil if token.empty?
      payload = decode(token)
      return nil unless payload
      Usuario[payload['id']]
    end
  end
end
