/*
 * Copyright (C) 2013 TopCoder Inc., All Rights Reserved.
 */
package com.topcoder.asset.entities;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import junit.framework.JUnit4TestAdapter;

import org.junit.Before;
import org.junit.Test;

import com.topcoder.asset.BaseUnitTests;

/**
 * <p>
 * Unit tests for {@link Category} class.
 * </p>
 *
 * @author sparemax
 * @version 1.0
 */
public class CategoryUnitTests {
    /**
     * <p>
     * Represents the <code>Category</code> instance used in tests.
     * </p>
     */
    private Category instance;

    /**
     * <p>
     * Adapter for earlier versions of JUnit.
     * </p>
     *
     * @return a test suite.
     */
    public static junit.framework.Test suite() {
        return new JUnit4TestAdapter(CategoryUnitTests.class);
    }

    /**
     * <p>
     * Sets up the unit tests.
     * </p>
     *
     * @throws Exception
     *             to JUnit.
     */
    @Before
    public void setUp() throws Exception {
        instance = new Category();
    }

    /**
     * <p>
     * Accuracy test for the constructor <code>Category()</code>.<br>
     * Instance should be correctly created.
     * </p>
     */
    @Test
    public void testCtor() {
        instance = new Category();

        assertEquals("'id' should be correct.", 0L, BaseUnitTests.getField(instance, "id"));
        assertNull("'name' should be correct.", BaseUnitTests.getField(instance, "name"));
        assertNull("'containerType' should be correct.", BaseUnitTests.getField(instance, "containerType"));
        assertEquals("'containerId' should be correct.", 0L, BaseUnitTests.getField(instance, "containerId"));
    }


    /**
     * <p>
     * Accuracy test for the method <code>getId()</code>.<br>
     * The value should be properly retrieved.
     * </p>
     */
    @Test
    public void test_getId() {
        long value = 1L;
        instance.setId(value);

        assertEquals("'getId' should be correct.",
            value, instance.getId());
    }

    /**
     * <p>
     * Accuracy test for the method <code>setId(long id)</code>.<br>
     * The value should be properly set.
     * </p>
     */
    @Test
    public void test_setId() {
        long value = 1L;
        instance.setId(value);

        assertEquals("'setId' should be correct.",
            value, BaseUnitTests.getField(instance, "id"));
    }

    /**
     * <p>
     * Accuracy test for the method <code>getName()</code>.<br>
     * The value should be properly retrieved.
     * </p>
     */
    @Test
    public void test_getName() {
        String value = "new_value";
        instance.setName(value);

        assertEquals("'getName' should be correct.",
            value, instance.getName());
    }

    /**
     * <p>
     * Accuracy test for the method <code>setName(String name)</code>.<br>
     * The value should be properly set.
     * </p>
     */
    @Test
    public void test_setName() {
        String value = "new_value";
        instance.setName(value);

        assertEquals("'setName' should be correct.",
            value, BaseUnitTests.getField(instance, "name"));
    }

    /**
     * <p>
     * Accuracy test for the method <code>getContainerType()</code>.<br>
     * The value should be properly retrieved.
     * </p>
     */
    @Test
    public void test_getContainerType() {
        String value = "new_value";
        instance.setContainerType(value);

        assertEquals("'getContainerType' should be correct.",
            value, instance.getContainerType());
    }

    /**
     * <p>
     * Accuracy test for the method <code>setContainerType(String containerType)</code>.<br>
     * The value should be properly set.
     * </p>
     */
    @Test
    public void test_setContainerType() {
        String value = "new_value";
        instance.setContainerType(value);

        assertEquals("'setContainerType' should be correct.",
            value, BaseUnitTests.getField(instance, "containerType"));
    }

    /**
     * <p>
     * Accuracy test for the method <code>getContainerId()</code>.<br>
     * The value should be properly retrieved.
     * </p>
     */
    @Test
    public void test_getContainerId() {
        long value = 1L;
        instance.setContainerId(value);

        assertEquals("'getContainerId' should be correct.",
            value, instance.getContainerId());
    }

    /**
     * <p>
     * Accuracy test for the method <code>setContainerId(long containerId)</code>.<br>
     * The value should be properly set.
     * </p>
     */
    @Test
    public void test_setContainerId() {
        long value = 1L;
        instance.setContainerId(value);

        assertEquals("'setContainerId' should be correct.",
            value, BaseUnitTests.getField(instance, "containerId"));
    }
}