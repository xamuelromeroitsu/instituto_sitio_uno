require 'openssl'

class Usuario < Sequel::Model(:usuarios)
  plugin :timestamps, update_on_create: true
  one_to_one :estudiante, key: :usuario_id

  def self.hash_password(password)
    salt = OpenSSL::Random.random_bytes(32)
    hash = OpenSSL::PKCS5.pbkdf2_hmac(password, salt, 10000, 32, 'SHA256')
    "#{salt.unpack1('H*')}:#{hash.unpack1('H*')}"
  end

  def self.verify_password(password, stored)
    salt_hex, hash_hex = stored.split(':')
    salt = [salt_hex].pack('H*')
    stored_hash = [hash_hex].pack('H*')
    computed = OpenSSL::PKCS5.pbkdf2_hmac(password, salt, 10000, 32, 'SHA256')
    computed == stored_hash
  end

  def validate
    super
    errors.add(:email, 'ya existe') if new? && Usuario.where(email: email).count > 0
  end
end
