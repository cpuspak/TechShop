package com.ecommercestore.tech.model;

public class CartItemAdd {
    private String customerUserName;
    private long productId;
    private long count;

    public String getCustomerUserName() {
        return customerUserName;
    }

    public long getProductId() {
        return productId;
    }

    public long getCount() {
        return count;
    }

    public void setCustomerUserName(String customerUserName) {
        this.customerUserName = customerUserName;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public void setCount(long count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "CartItemAdd{" +
                "customerUserName='" + customerUserName + '\'' +
                ", productId=" + productId +
                ", count=" + count +
                '}';
    }
}
