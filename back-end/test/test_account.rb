require 'minitest/autorun'
require_relative '../payments_app/lib/account'
require_relative '../payments_app/lib/services/payment_service'

class AccountTest < Minitest::Test
  def setup
    @account = Entities::Account.new(50.0, Date.today.year)
  end

  def test_initially_no_paid_months
    assert_equal [], @account.months_paid
  end

  def test_mark_paid_via_service
    Services::PaymentService.pay(@account, 2, 1, Date.new(2026,1,15))
    assert_equal [1,2], @account.months_paid
  end

  def test_months_owed
    Services::PaymentService.pay(@account, 1, 1, Date.today)
    owed = (1..Date.today.month).to_a - @account.months_paid
    assert_equal owed, @account.months_owed
  end

  def test_paid_in_advance
    Services::PaymentService.pay(@account, 1, 12, Date.today)
    if Date.today.month < 12
      assert_includes @account.months_paid_in_advance, 12
    else
      assert_equal [], @account.months_paid_in_advance
    end
  end
end

