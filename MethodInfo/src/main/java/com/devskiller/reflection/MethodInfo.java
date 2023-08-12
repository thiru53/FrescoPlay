package com.devskiller.reflection;

import java.util.List;

public record MethodInfo(String name, boolean isAbstract, List<Class> args, Class returnType) {
}
