module AuthHelper
  def generar_token(payload)
    exp = Time.now.to_i + 24 * 3600
    JWT.encode(payload.merge(exp: exp), JWT_SECRET, 'HS256')
  end

  def decodificar_token(token)
    JWT.decode(token, JWT_SECRET, true, algorithm: 'HS256')[0]
  rescue JWT::DecodeError, JWT::ExpiredSignature
    nil
  end
end
