package com.devskiller.reflection;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class MethodListHelper {

	/**
	 * Method returns methods metadata
	 * @param aClass class to analyse
	 * @param includeAbstract should we include abstract methods
	 * @param includeSuperclass should we include methods from the class we extend (only direct superclass)
	 * @return collection of methods metadata
	 */
	public Collection<MethodInfo> listMethods(Class aClass, boolean includeAbstract, boolean includeSuperclass) {

		List<MethodInfo> list = new ArrayList<>();
		Method[] methods = aClass.getDeclaredMethods();

		for (Method method : methods) {
			int mod = method.getModifiers();
			List<Class> methodArgs = List.of(method.getParameterTypes());
			if(includeAbstract && Modifier.isAbstract(mod)) {
				list.add(new MethodInfo(method.getName(), Modifier.isAbstract(mod), methodArgs, method.getReturnType()));
			} else {
				list.add(new MethodInfo(method.getName(), Modifier.isAbstract(mod), methodArgs, method.getReturnType()));
			}
		}
		if (includeSuperclass) {
			Class c1 = aClass.getSuperclass();
			Method[] methods1 = c1.getDeclaredMethods();
			for (Method method : methods1) {
				int mod = method.getModifiers();
				List<Class> methodArgs = List.of(method.getParameterTypes());
				if(includeAbstract && Modifier.isAbstract(mod)) {
					list.add(new MethodInfo(method.getName(), Modifier.isAbstract(mod), methodArgs, method.getReturnType()));
				} else {
					list.add(new MethodInfo(method.getName(), Modifier.isAbstract(mod), methodArgs, method.getReturnType()));
				}
			}
	}

		//throw new UnsupportedOperationException(/*TODO*/);
		return list;
	}
}
